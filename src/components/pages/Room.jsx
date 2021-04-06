import React, { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { db } from "../../services/Firebase/firebase";
import useUserMedia from "../common/useUserMedia";
import { deleteCollection } from "../../services/Firebase/deleteCollection";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function Room({ onClose, event }) {
  const localVideo = useRef();
  const remoteVideo = useRef();
  const callIdRef = useRef("");
  const localStream = useUserMedia({
    video: true,
    audio: true,
  });
  const [remoteStream, setRemoteStream] = useState(new MediaStream());

  let pc = new RTCPeerConnection(servers);

  if (localStream && localVideo.current && !localVideo.current.srcObject) {
    localVideo.current.srcObject = localStream;
    localVideo.current.muted = true;

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
      console.log({ track });
    });
  }

  if (remoteStream && remoteVideo.current && !remoteVideo.current.srcObject) {
    remoteVideo.current.srcObject = remoteStream;
  }

  pc.ontrack = (event) => {
    console.log({ event });
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
    // setRemoteStream(new MediaStream());
    console.log({ remoteStream });
    remoteVideo.current.srcObject = remoteStream;
  };

  const handleCall = async () => {
    const callDoc = db.collection("calls").doc();
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");
    const appointmentRef = db.collection("appointments").doc(event._id);
    await appointmentRef.update({ roomId: callDoc.id });
    callIdRef.current.value = callDoc.id;

    pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    // pc automatically generate icecandidate in following function
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    callDoc.onSnapshot(async (snapshot) => {
      console.log("Got updated room:", snapshot.data());
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        console.log("Set remote description: ", data.answer);
        const anserDescription = new RTCSessionDescription(data.answer);
        await pc.setRemoteDescription(anserDescription);
      }
    });

    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          console.log("Got answer:", change.doc.data());
          const candidate = new RTCIceCandidate(change.doc.data());
          await pc.addIceCandidate(candidate);
        }
      });
    });
  };

  const handleAnswer = async () => {
    const appointmentRef = db.collection("appointments").doc(event._id);
    const data = (await appointmentRef.get()).data();
    const roomId = data.roomId;
    const callDoc = db.collection("calls").doc(roomId);
    const answerCandidates = callDoc.collection("answerCandidates");
    const offerCandidates = callDoc.collection("offerCandidates");

    pc.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();
    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await callDoc.update({ answer });

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  const handleCanPlay = () => {
    localVideo.current.play();
  };

  console.log({ remoteStream });

  const onEndMeeting = async () => {
    const callDoc = db.collection("calls").doc(event._id);
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");
    await deleteCollection(db, offerCandidates);
    const data = await callDoc.update({
      offer: db.fieldValue.delete(),
      answer: db.fieldValue.delete(),
    });
    onClose();
  };

  return (
    <div className="videos">
      <Button onClick={onEndMeeting}>End meeting</Button>
      <Button onClick={handleCall}>Call</Button>
      <Button onClick={handleAnswer}>Answer</Button>
      <input type="text" ref={callIdRef} />
      <span>
        <h3>Local Stream</h3>
        <video
          id="localVideo"
          ref={localVideo}
          onCanPlay={handleCanPlay}
          playsInline
        ></video>
      </span>
      <span>
        <h3>Remote Stream</h3>
        <video id="remoteVideo" ref={remoteVideo} autoPlay playsInline></video>
      </span>
    </div>
  );
}

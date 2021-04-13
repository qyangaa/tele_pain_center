import React, { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { db } from "../../services/Firebase/firebase";
import useUserMedia from "../common/useUserMedia";
import firebase from "firebase/app";
import "./Room.css";
import { FusionTablesLayer } from "react-google-maps";

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
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const localStream = useUserMedia({
    video: true,
    audio: true,
  });

  let pc = new RTCPeerConnection(servers);

  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
    remoteVideo.current.srcObject = remoteStream;
  };

  if (localStream && localVideo.current && !localVideo.current.srcObject) {
    localVideo.current.srcObject = localStream;
    localVideo.current.muted = true;

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });
  }

  if (remoteStream && remoteVideo.current && !remoteVideo.current.srcObject) {
    remoteVideo.current.srcObject = remoteStream;
  }

  useEffect(async () => {
    if (localStream) await enterRoom();
    return () => {
      onEndMeeting();
    };
  }, [localStream]);

  const enterRoom = async () => {
    const appointmentRef = db.collection("appointments").doc(event._id);
    const doc = await appointmentRef.get();
    if (doc.data().roomId) await handleAnswer(doc.data().roomId);
    else await handleCall(appointmentRef);
  };

  const handleCall = async (appointmentRef) => {
    // console.log("handleCall");
    const callDoc = db.collection("calls").doc();
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");
    await appointmentRef.update({ roomId: callDoc.id });

    pc.onicecandidate = (event) => {
      // console.log("adding candidates");
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    // pc automatically generate icecandidate in following function
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ ...event, offer });

    callDoc.onSnapshot(async (snapshot) => {
      // console.log("Got updated room:", snapshot.data());
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        // console.log("Set remote description: ", data.answer);
        const anserDescription = new RTCSessionDescription(data.answer);
        await pc.setRemoteDescription(anserDescription);
      }
    });

    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          // console.log("Got answer:", change.doc.data());
          const candidate = new RTCIceCandidate(change.doc.data());
          await pc.addIceCandidate(candidate);
        }
      });
    });
  };

  const handleAnswer = async (roomId) => {
    // console.log("handleAnswer", { roomId });
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

  const onEndMeeting = async () => {
    const appointmentRef = db.collection("appointments").doc(event._id);
    const data = await appointmentRef.update({
      roomId: firebase.firestore.FieldValue.delete(),
    });
    onClose();
  };

  return (
    <div>
      {/* <Button onClick={handleCall}>Call</Button>
      <Button onClick={handleAnswer}>Answer</Button> */}
      <div className="room-container">
        <Button onClick={onEndMeeting} id="btn-end-meeting">
          End meeting
        </Button>
        <div className="video-container">
          <video
            id="remoteVideo"
            ref={remoteVideo}
            autoPlay
            playsInline
          ></video>
          <video
            id="localVideo"
            ref={localVideo}
            onCanPlay={handleCanPlay}
            playsInline
          ></video>
        </div>
      </div>
    </div>
  );
}

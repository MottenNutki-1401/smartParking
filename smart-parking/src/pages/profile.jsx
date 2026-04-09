import React from 'react';
import '../styles/header.css';
import ParkingSlots from './parkingslots';

function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1>Profile</h1>
        <p>Parked in slot:
        #{ParkingSlots.selectedSlot?.id}</p>

        <div className="btngrp">
        <button className="delete-btn" onClick={onClose}>
          Delete Account
        </button>
        <button className="logout-btn" onClick={onClose}>
          Logout </button>
      </div>
        </div>
    </div>
  );
}


export default ProfileModal;
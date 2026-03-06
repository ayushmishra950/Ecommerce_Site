"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const RatingModal = ({ isOpen, onOpenChange }) => {
  const [rating, setRating] = useState(0); // 0 to 5 stars
  const [hover, setHover] = useState(0); // hover effect
  const [feedback, setFeedback] = useState("");

  const stars = [1, 2, 3, 4, 5];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Rate Your Experience</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Please rate the product and leave your valuable feedback. Your input helps us improve our service.
          </DialogDescription>
        </DialogHeader>

        {/* Star Rating */}
        <div className="flex items-center justify-center my-4 space-x-2">
          {stars.map((star) => (
            <svg
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              xmlns="http://www.w3.org/2000/svg"
              fill={(hover || rating) >= star ? "yellow" : "gray"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-10 h-10 cursor-pointer transition-colors duration-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          ))}
        </div>

        {/* Feedback textarea */}
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your thoughts about the product..."
          className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 resize-none"
        />

        {/* Submit Button */}
        <button
          onClick={() => {
            console.log({ rating, feedback });
            onOpenChange(false); // close modal
          }}
          className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Submit
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;
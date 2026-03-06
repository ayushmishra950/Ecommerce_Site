"use client";

import { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { addRating, getRating } from "@/services/service";

interface RatingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cartList?: [];
  onSubmit?: (data: { rating: number; feedback: string }) => void;
}

const RatingModal = ({ isOpen, onOpenChange, cartList, onSubmit }: RatingModalProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const stars = [1, 2, 3, 4, 5];

  const getRatingText = (val: number) => {
    switch (val) {
      case 1: return "Poor";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Very Good";
      case 5: return "Excellent";
      default: return "Select a rating";
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (onSubmit) {
      onSubmit({ rating, feedback });
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Auto close after 2.5 seconds on success
    setTimeout(() => {
      onOpenChange(false);
      // Reset state for next time
      setTimeout(() => {
        setIsSubmitted(false);
        setRating(0);
        setFeedback("");
      }, 500);
    }, 2500);
  };

  const handleGetRating = async () => {
    const res = await getRating(productId);
    setRating(res.data.rating);
    setFeedback(res.data.feedback);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md overflow-hidden border-none p-0 bg-white dark:bg-zinc-950 shadow-2xl rounded-2xl transform transition-all duration-300">
        <div className={cn(
          "transition-all duration-500 ease-in-out w-full",
          isSubmitted ? "opacity-0 scale-95 pointer-events-none absolute" : "opacity-100 scale-100"
        )}>
          {!isSubmitted && (
            <div className="p-6">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
                  Rate Your Experience
                </DialogTitle>
                <DialogDescription className="text-zinc-500 dark:text-zinc-400 mt-2">
                  {productName ? `How was your experience with ${productName}?` : "We'd love to hear your feedback about your recent purchase."}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col items-center justify-center space-y-4 py-4">
                <div className="flex items-center space-x-2">
                  {stars.map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="group relative transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        size={40}
                        className={cn(
                          "transition-all duration-300",
                          (hover || rating) >= star
                            ? "fill-yellow-400 text-yellow-500 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                            : "fill-transparent text-zinc-300 dark:text-zinc-700 hover:text-yellow-200"
                        )}
                      />
                    </button>
                  ))}
                </div>

                <span className={cn(
                  "text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-300 transform",
                  rating > 0
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 scale-110 shadow-sm"
                    : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                )}>
                  {getRatingText(hover || rating)}
                </span>
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                  Additional Feedback
                </label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you liked or what we could improve..."
                  className="min-h-[120px] bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 resize-none rounded-xl transition-all duration-200"
                />
              </div>

              <DialogFooter className="mt-8 sm:justify-center">
                <Button
                  onClick={handleSubmit}
                  disabled={rating === 0 || isSubmitting}
                  className="w-full sm:w-64 h-12 text-lg font-semibold bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white border-none rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale-[0.5]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : "Submit Rating"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </div>

        <div className={cn(
          "transition-all duration-700 ease-out p-12 flex flex-col items-center text-center space-y-4 w-full",
          isSubmitted ? "opacity-100 scale-100 relative" : "opacity-0 scale-90 absolute pointer-events-none"
        )}>
          {isSubmitted && (
            <>
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-2 animate-in zoom-in duration-500">
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <DialogTitle className="text-2xl font-bold text-zinc-900 dark:text-white">
                Thank You!
              </DialogTitle>
              <DialogDescription className="text-lg text-zinc-600 dark:text-zinc-400">
                Your feedback has been submitted successfully. We appreciate your support!
              </DialogDescription>
              <div className="w-full pt-4">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="rounded-xl px-8 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border-zinc-200 dark:border-zinc-800"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;

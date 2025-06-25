import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { postData } from "@/lib/api";

function Popupmodal({ onClose, onShowModal }) {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    message: "",
    reference: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim())
      return setError("Full name is required"), false;
    if (!formData.mobileNumber.trim())
      return setError("Mobile Number number is required"), false;
    if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, "")))
      return setError("Please enter a valid 10-digit Mobile Number number"), false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await postData("app/coach-register/reference", formData, "POST")
      if (response.status_code === 200) {
        setSuccess(true);
      } else {
        setError(response.message || "Booking failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 p-4">
      <div className="relative bg-white border p-6 md:p-10 rounded-2xl shadow-2xl max-w-3xl w-full animate-scaleIn text-black">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          <X className="w-5 h-5 text-black" />
        </button>

        {success ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <h2 className="text-2xl font-bold text-green-600">Success!</h2>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-center mb-2 text-black">
              Register Now
            </h2>
            <p className="text-center  text-sm mb-6 text-black">
              (Limited slots per day)
            </p>

            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 flex items-start">
                <X className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 ">
              <div className="grid grid-cols-1 gap-5 space-y-4 md:space-y-0">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="flex-1 border border-dark rounded-full  px-5 py-3  focus:outline-none focus:ring-secondary"
                  disabled={loading}
                />
                <div className="flex items-center border border-dark rounded-full px-5 py-3">
                  <span className="text-black mr-2">🇮🇳 +91</span>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="WhatsApp Preferred"
                    className="flex-1 outline-none "
                    disabled={loading}
                  />
                </div>
                <div className="flex items-center border border-dark rounded-full px-5 py-3">
                  <span className="text-black mr-2">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="flex-1 outline-none "
                    disabled={loading}
                  />
                </div>
                <div className="flex items-center border border-dark rounded-full px-5 py-3">
                  <span className="text-black mr-2">Reference</span>
                  <input
                    type="text"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    placeholder="Enter coach ID"
                    className="flex-1 outline-none "
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-hover transition text-white py-3 rounded-full font-bold shadow-md flex items-center justify-center animate-bounce-loop"
              >
                {loading ? <>Processing...</> : "Register"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Popupmodal;

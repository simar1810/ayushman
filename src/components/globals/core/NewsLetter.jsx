import { useState } from "react"

export default function NewsLetter() {
  const [newsletterEmail, setNewsletterEmail] = useState("")

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
  }
  return <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
    <div className="max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-blue-500 font-semibold text-sm uppercase tracking-wide mb-4">JOIN OUR NEWSLETTER</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
            Receive health & wellness updates and tips right to your inbox
          </h3>
        </div>

        <form onSubmit={handleNewsletterSubmit} className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
}
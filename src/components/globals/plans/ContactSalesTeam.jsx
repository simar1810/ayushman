import toast from "react-hot-toast";
import Modal from "@/components/globals/core/Modal";
import FormControl from "@/components/globals/core/FormControl2";
import { postData } from "@/lib/api";
import { contactFormData } from "@/config/plan";

export default function ContactSalesTeam({
  onClose
}) {
  async function contactUs(e) {
    e.preventDefault();
    try {
      const data = {
        name: e.currentTarget.name.value,
        email: e.currentTarget.email.value,
        phone: e.currentTarget.phone.value,
      }
      const response = await postData("app/purchase-page/contact", data);
      if (!response.success) throw new Error(response?.message);
      toast.success(response.message || "We will contact you soon!");
      onClose();
    } catch (error) {
      toast.error(error.message ?? "Please try again later!");
    }
  }

  return <>
    <Modal
      className="flex items-center justify-center"
      onClose={onClose}
    >
      <form
        onSubmit={contactUs}
        className="max-w-[550px] w-full bg-white p-8 rounded-[20px]"
      >
        <h2 className="font-bold text-[20px] md:text-[28px] leading-[1.2] mb-12">Let's Get Started With <span className="text-[var(--accent-1)]">WellnessZ</span></h2>
        {contactFormData.map(config => <FormControl
          key={config.id}
          {...config}
        />
        )}
        <button className="bg-green-600 text-white text-[16px] font-bold leading-[1] block mx-auto mt-8 py-2 px-4 rounded-md">
          Submit
        </button>
      </form>
    </Modal>
  </>
}
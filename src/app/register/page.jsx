import PageHeader from "@/components/globals/core/PageHeader";
import RegistrationForm from "@/components/globals/core/RegistrationForm";
import Faqs from "@/components/globals/home-page/Faqs";

export default function Page() {
  return (
    <main>
      <PageHeader title="Register" description="" />
      <div className="my-10">
        <RegistrationForm />
      </div>
      <Faqs />
    </main>
  );
}

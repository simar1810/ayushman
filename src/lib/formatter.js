export function date_DDMMYYYY_string(input) {
  if (!input) return ""
  const [day, month, year] = input.split("-");
  const date = new Date(`${year}-${month}-${day}`);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function getSubscriptionPlanType(input) {
  switch (input) {
    case 0:
      return "Free"
    case 1:
      return "Basic";
    case 2:
      return "Pro";
    default:
      return "Free";
  }
}
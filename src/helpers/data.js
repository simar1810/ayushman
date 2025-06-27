export function displayPlan(planCode) {
  switch (planCode) {
    case 0:
      return "Free Trial"
    case 1:
      return "Basic Plan"
    case 2:
      return "Pro Plan"
    default:
      return "_";
  }
}
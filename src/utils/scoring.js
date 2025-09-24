export const calculateRuleScore = (lead, offer) => {
  let score = 0;

  const role = lead.role?.toLowerCase();
  if (
    role.includes("ceo") ||
    role.includes("founder") ||
    role.includes("co-founder") ||
    role.includes("owner") ||
    role.includes("cto")
  ) {
    score += 20;
  } else if (
    role.includes("manager") ||
    role.includes("head") ||
    role.includes("director")
  ) {
    score += 10;
  }

  const leadIndustry = lead.industry?.toLowerCase();
  const icp = offer.ideal_use_cases.map((useCase) => useCase.toLowerCase());
  if (icp.some((i) => leadIndustry === i)) {
    score += 20;
  } else if (
    icp.some((i) => leadIndustry?.includes(i) || i.includes(leadIndustry))
  ) {
    score += 10;
  }

  const requiredFields = [
    "name",
    "role",
    "company",
    "industry",
    "location",
    "linkedin_bio",
  ];

  if (
    requiredFields.every((field) => lead[field] && lead[field].trim() !== "")
  ) {
    score += 10;
  }

  return score;
};

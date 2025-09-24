export const calculateRuleScore = (lead, offer) => {
  let score = 0;

  // Role relevance scoring
  const role = lead.role?.toLowerCase();
  if (
    role.includes("ceo") ||
    role.includes("founder") ||
    role.includes("co-founder") ||
    role.includes("owner") ||
    role.includes("cto")
  ) {
    score += 20; // Decision makers
  } else if (
    role.includes("manager") ||
    role.includes("head") ||
    role.includes("director")
  ) {
    score += 10; // Influencers
  }

  // Industry match scoring
  const leadIndustry = lead.industry?.toLowerCase();
  const icp = offer.ideal_use_cases.map((useCase) => useCase.toLowerCase());
  if (icp.some((i) => leadIndustry === i)) {
    score += 20; // Exact match
  } else if (
    icp.some((i) => leadIndustry?.includes(i) || i.includes(leadIndustry))
  ) {
    score += 10; // Adjacent match
  }

  // Data completeness scoring
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
    score += 10; // All required fields present
  }

  return score; // Total rule-based score (max 50)
};

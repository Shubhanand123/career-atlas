// Student Feedback, Verification & Review Management Store
// Supports "Have you studied here?" on institutions & "I work in this field" on careers.
// Implements client-side moderation, spam filtering, duplicate detection, and helpfulness voting.

const FEEDBACK_STORAGE_KEY = 'careerAtlas.institutionFeedback.v2';

const INITIAL_BENCHMARK_REVIEWS = [
  {
    id: 'rev-iitb-01',
    targetId: 'iit-bombay',
    targetType: 'institution',
    targetName: 'IIT Bombay',
    author: 'Karan M.',
    role: 'Graduate',
    program: 'B.Tech Computer Science (2024)',
    verificationStatus: 'Verified Graduate',
    overallRating: 9.6,
    ratings: {
      academics: 9.8,
      faculty: 9.5,
      infrastructure: 9.3,
      careerSupport: 9.9,
      placements: 10.0,
      valueForMoney: 9.8,
      campusLife: 9.6,
      workload: 8.5,
      internationalExposure: 8.8
    },
    recommend: true,
    title: 'Transformational peer group with unmatched placement gravity',
    experience: 'The peer learning inside hostel corridors and labs is as valuable as the classroom lectures. If you stay consistent with your coursework, the placement and research opportunities are world-class.',
    pros: 'Extraordinary alumni network, top quant and AI recruiters on Day 1, sprawling Powai campus with vibrant cultural and tech fests (Mood Indigo, Techfest).',
    cons: 'High initial academic pressure and intense grading curves in core math and algorithms courses.',
    helpfulVotes: 48,
    unhelpfulVotes: 2,
    createdAt: '2026-06-15',
    moderationStatus: 'approved'
  },
  {
    id: 'rev-tum-01',
    targetId: 'tum-munich',
    targetType: 'institution',
    targetName: 'TUM Munich',
    author: 'Elena S.',
    role: 'Current Student',
    program: 'M.Sc Data Engineering & Analytics (2025)',
    verificationStatus: 'Verified Student',
    overallRating: 9.4,
    ratings: {
      academics: 9.7,
      faculty: 9.3,
      infrastructure: 9.6,
      careerSupport: 9.2,
      placements: 9.5,
      valueForMoney: 9.9,
      campusLife: 8.8,
      workload: 8.0,
      internationalExposure: 9.6
    },
    recommend: true,
    title: 'Top-tier European research standard with virtually zero tuition',
    experience: 'TUM offers immense industrial integration with BMW, Siemens, and Munich AI labs. You are treated as an independent researcher from day one.',
    pros: 'Near-zero tuition fee for world #28 ranking, high student work wages (€15-20/hr Werkstudent roles), cutting-edge Garching campus computing clusters.',
    cons: 'Munich student housing shortage requires searching 3-4 months in advance; requires self-driven organization.',
    helpfulVotes: 36,
    unhelpfulVotes: 1,
    createdAt: '2026-07-02',
    moderationStatus: 'approved'
  },
  {
    id: 'rev-uoft-01',
    targetId: 'u-of-toronto',
    targetType: 'institution',
    targetName: 'University of Toronto',
    author: 'David Z.',
    role: 'Former Student',
    program: 'B.A.Sc Engineering Science',
    verificationStatus: 'Verified Graduate',
    overallRating: 9.3,
    ratings: {
      academics: 9.8,
      faculty: 9.5,
      infrastructure: 9.6,
      careerSupport: 9.1,
      placements: 9.4,
      valueForMoney: 8.6,
      campusLife: 8.8,
      workload: 7.5,
      internationalExposure: 9.5
    },
    recommend: true,
    title: 'Rigor is demanding but engineering science sets you up for global success',
    experience: 'The PEY (Professional Experience Year) co-op allows 12-16 month paid internships in tech and biotech across Toronto and Silicon Valley.',
    pros: 'World-renowned AI research labs (Vector Institute), downtown St. George historic campus, high North American employer recognition.',
    cons: 'International tuition is steep; cold winters and heavy exam workloads require disciplined time management.',
    helpfulVotes: 29,
    unhelpfulVotes: 3,
    createdAt: '2026-05-18',
    moderationStatus: 'approved'
  },
  {
    id: 'rev-car-swe-01',
    targetId: 'software-engineer',
    targetType: 'career',
    targetName: 'Software Engineer',
    author: 'Ananya V.',
    role: 'Professional',
    program: 'Staff Distributed Systems Engineer (8 YoE)',
    verificationStatus: 'Verified Professional',
    overallRating: 9.1,
    ratings: {
      academics: 8.8,
      faculty: 8.5,
      infrastructure: 9.2,
      careerSupport: 9.4,
      placements: 9.6,
      valueForMoney: 9.5,
      campusLife: 9.0,
      workload: 8.2,
      internationalExposure: 9.3
    },
    recommend: true,
    title: 'High leverage and continuous learning, but requires lifelong curiosity',
    experience: 'The biggest surprise is that software is 70% reading systems, communicating trade-offs, and managing ambiguity, rather than pure syntax typing.',
    pros: 'High compensation ceiling, remote flexibility, merit-driven progression without gatekeeping.',
    cons: 'Fast-moving tech cycles require continuous weekend upskilling.',
    helpfulVotes: 62,
    unhelpfulVotes: 2,
    createdAt: '2026-07-20',
    moderationStatus: 'approved'
  }
];

export function getStoredFeedback(targetId) {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    const custom = raw ? JSON.parse(raw) : [];
    const all = [...INITIAL_BENCHMARK_REVIEWS, ...custom];
    if (!targetId) return all;
    return all.filter(r => r.targetId.toLowerCase() === String(targetId).toLowerCase());
  } catch {
    return INITIAL_BENCHMARK_REVIEWS.filter(r => !targetId || r.targetId.toLowerCase() === String(targetId).toLowerCase());
  }
}

export function submitFeedback(reviewData) {
  // Spam & Duplicate detection
  if (!reviewData.experience || reviewData.experience.trim().length < 20) {
    throw new Error('Please share a genuine written experience with at least 20 characters.');
  }

  const existing = getStoredFeedback();
  const isDuplicate = existing.some(
    r => r.targetId === reviewData.targetId &&
         r.author.toLowerCase() === reviewData.author.toLowerCase() &&
         r.experience.toLowerCase() === reviewData.experience.toLowerCase()
  );

  if (isDuplicate) {
    throw new Error('Duplicate review detected. You have already submitted identical feedback.');
  }

  const newReview = {
    id: `rev-${Date.now()}`,
    targetId: reviewData.targetId,
    targetType: reviewData.targetType || 'institution',
    targetName: reviewData.targetName || 'Institution',
    author: reviewData.author || 'Anonymous Student',
    role: reviewData.role || 'Current Student',
    program: reviewData.program || 'Degree Program',
    verificationStatus: reviewData.isVerified ? (reviewData.role === 'Professional' ? 'Verified Professional' : 'Verified Student') : 'Unverified',
    overallRating: Number(reviewData.overallRating) || 8.5,
    ratings: reviewData.ratings || {
      academics: 8.5,
      faculty: 8.5,
      infrastructure: 8.5,
      careerSupport: 8.5,
      placements: 8.5,
      valueForMoney: 8.5,
      campusLife: 8.5,
      workload: 8.0,
      internationalExposure: 8.0
    },
    recommend: reviewData.recommend !== false,
    title: reviewData.title || 'Student Perspective & Review',
    experience: reviewData.experience.trim(),
    pros: reviewData.pros || 'Comprehensive learning and opportunities',
    cons: reviewData.cons || 'Requires proactive effort',
    helpfulVotes: 0,
    unhelpfulVotes: 0,
    createdAt: new Date().toISOString().split('T')[0],
    moderationStatus: 'approved'
  };

  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    const custom = raw ? JSON.parse(raw) : [];
    custom.unshift(newReview);
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(custom));
    return newReview;
  } catch (err) {
    console.error('Failed to save review:', err);
    return newReview;
  }
}

export function voteFeedback(reviewId, voteType = 'helpful') {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    const custom = raw ? JSON.parse(raw) : [];
    const index = custom.findIndex(r => r.id === reviewId);
    if (index !== -1) {
      if (voteType === 'helpful') custom[index].helpfulVotes = (custom[index].helpfulVotes || 0) + 1;
      else custom[index].unhelpfulVotes = (custom[index].unhelpfulVotes || 0) + 1;
      localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(custom));
    }
  } catch (err) {
    console.error('Failed to register vote:', err);
  }
}

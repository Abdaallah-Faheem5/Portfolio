import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiDatabase,
  FiExternalLink,
  FiFileText,
  FiFlag,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiServer,
  FiShield,
  FiTool,
  FiUser,
} from 'react-icons/fi';

const ICON_MAP = {
  // skills
  FE: FiCode,
  BE: FiServer,
  DB: FiDatabase,
  JV: FiCode,
  TL: FiTool,
  CP: FiAward,
  // experience
  W: FiBriefcase,
  E: FiBookOpen,
  C: FiFlag,
  // projects
  '01': FiExternalLink,
  '02': FiShield,
  '03': FiUser,
  // contact
  EMAIL: FiMail,
  PHONE: FiPhone,
  LINKEDIN: FiLinkedin,
  GITHUB: FiGithub,
  CV: FiFileText,
};

export function AppIcon({ name, className }) {
  const Icon = ICON_MAP[name] || FiCode;
  return <Icon className={className} aria-hidden="true" focusable="false" />;
}


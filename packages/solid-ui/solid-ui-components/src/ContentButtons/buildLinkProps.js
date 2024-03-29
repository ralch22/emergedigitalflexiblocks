import { Link as GLink, navigate } from 'gatsby';
import { Button, Link } from 'theme-ui';
import AppButton from '@solid-ui-components/AppButton';
import VideoButton from '@solid-ui-components/VideoButton';

const isValidHttpUrl = link => {
  let url;
  const protocols = ['http:', 'https:', 'mailto:'];
  try {
    url = new URL(link);
  } catch (_) {
    return false;
  }
  return protocols.includes(url.protocol);
};

const auth =
  typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
const parsedData = JSON.parse(auth);

const buildLinkProps = ({
  content: { type, link, target, variant, text },
  setActiveModal,
  setActiveTab,
}) => {
  // Button or Text Link ?
  const isInternalLink = link && !isValidHttpUrl(link);
  const isLinkVariant = variant?.startsWith('links.');

  let linkProps;
  let Component = isLinkVariant ? Link : Button;

  switch (type) {
    case 'VIDEO':
      Component = VideoButton;
      linkProps = { link };
      break;
    case 'APP':
      Component = AppButton;
      linkProps = { link };
      break;
    case 'MODAL':
      linkProps = {
        onClick: e => {
          e.preventDefault();
          setActiveModal(link);
        },
        href: '#',
      };
      break;
    case 'AUTHMODAL':
      linkProps = {
        onClick: e => {
          e.preventDefault();
          setActiveModal(link);
        },
        href: '#',
        sx: { display: !parsedData ? `block` : `none` },
      };
      break;
    case 'TAB':
      linkProps = {
        tabindex: '0',
        onClick: () =>
          setActiveTab({
            identifier: link.split('.')[0],
            index: parseInt(link.split('.')[1]),
          }),
      };
      break;
    case 'ANCHOR':
      linkProps = { href: link, as: 'a', target, offset: 150 };
      break;
    case 'AUTH':
      linkProps = {
        onClick: () => navigate('/dashboard'),
        sx: { display: parsedData ? `block` : `none` },
      };
      break;
    case 'SUBMIT':
      linkProps = { type: 'submit' };
      break;
    case 'PAGE':
      linkProps = {
        [isInternalLink ? 'to' : 'href']: link || undefined,
        as: isInternalLink ? GLink : 'a',
        target,
      };
      break;
    case 'SUB':
      linkProps = { as: 'div' };
      break;
    case 'INNERSUB':
      linkProps = { as: 'div' };
      break;
    default:
      linkProps = {};
      break;
  }

  linkProps.className = isLinkVariant
    ? 'button-group-link'
    : 'button-group-button';

  return { Component, linkProps };
};

export default buildLinkProps

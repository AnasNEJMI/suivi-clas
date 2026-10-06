import type { User } from '@/api/auth'
import { AssociationInfoCard } from './info-card';
import AssocProfileTitle from './profile-title';

const AssocProfileCard = ({association} : {association : User}) => {
    const associationData = association.association;
    if(!associationData) return null;
    const label = associationData.label;
    const address = associationData.address;
    const postalCode = associationData.postalCode;
  return (
    <>
      <AssocProfileTitle
        label={label}
        isVerified
      />
      <AssociationInfoCard label = {label} address = {address} postalCode = {postalCode} />
    </>
  )
}

export default AssocProfileCard
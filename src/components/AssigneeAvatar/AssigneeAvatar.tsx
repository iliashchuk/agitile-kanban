import { Avatar, Tooltip, AvatarProps } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ProjectContext } from '../../context/ProjectContext';

interface Props extends AvatarProps {
  assigneeName?: string;
}

export const AssigneeAvatar: React.FC<Props> = ({
  assigneeName,
  ...avatarProps
}) => {
  const { contributors } = useContext(ProjectContext);

  if (!assigneeName) {
    return null;
  }

  const assignee = contributors.find(
    (contributor) => contributor.login === assigneeName
  );

  if (!assignee) {
    return null;
  }

  return (
    <Tooltip label={assigneeName}>
      <Avatar {...avatarProps} src={assignee.avatar_url} />
    </Tooltip>
  );
};

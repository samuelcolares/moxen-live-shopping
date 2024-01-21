import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AvatarProps = {
  className?: string;
  src: string;
  alt: string;
  fallback: string;
};

const ProfileAvatar: React.FC<AvatarProps> = ({
  className,
  src,
  alt,
  fallback,
}) => {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;

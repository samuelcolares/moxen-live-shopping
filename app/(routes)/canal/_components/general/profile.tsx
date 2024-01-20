
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProfileProps = {
  userImg: string;
  name: string;
  surname: string;
  username: string;
  liveQty: number;
  productQty: number;
};

const Profile: React.FC<ProfileProps> = ({
  userImg,
  name,
  surname,
  username,
  liveQty,
  productQty,
}) => {

  const liveQtyString = liveQty === 1 ? `${liveQty} live` : `${liveQty} lives`;
  const productQtyString =
    productQty === 1 ? `${productQty} produto` : `${productQty} produtos`;
  return (
    <div className="flex gap-4 mb-5 items-center">
      <div className="aspect-square rounded-md h-40 w-40 bg-slate-600 relative overflow-hidden">
        <Image src={userImg} fill alt={`${name}`} priority />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl">{`${name} ${surname}`}</h2>
        <ul className="flex gap-4 text-muted-foreground">
          <li>
            <span>@{username}</span>
          </li>
          <li>
            <span>{liveQtyString}</span>
          </li>
          <li>
            <span>{productQtyString}</span>
          </li>
        </ul>
        <div className="flex gap-4">
          <Button asChild className="rounded-md" variant={"secondary"}>
            <Link href={"/canal/live/novaLive"}>Agendar Live</Link>
          </Button>
          <Button asChild className="rounded-md" variant={"secondary"}>
            <Link href={"/canal/produto/novoProduto"}>Cadastrar Produto</Link>
          </Button>
        </div>
      </div>

    </div>
  );
};

export default Profile;

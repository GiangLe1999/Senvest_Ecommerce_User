import {
  CreditCardIcon,
  PackageOpenIcon,
  RotateCwIcon,
  TruckIcon,
} from "lucide-react";
import { FC } from "react";

interface Props {
  t: any;
}

const iconClassname = "w-7 h-7 text-muted";

const data = [
  {
    name: "secure_payment",
    desc: "secure_payment_desc",
    icon: <CreditCardIcon className={iconClassname} />,
  },
  {
    name: "fast_delivery",
    desc: "fast_delivery_desc",
    icon: <TruckIcon className={iconClassname} />,
  },
  {
    name: "free_returns",
    desc: "free_returns_desc",
    icon: <RotateCwIcon className={iconClassname} />,
  },
  {
    name: "packaging",
    desc: "packaging_desc",
    icon: <PackageOpenIcon className={iconClassname} />,
  },
];

const Features: FC<Props> = ({ t }): JSX.Element => {
  return (
    <div className="">
      <ul className="space-y-4">
        {data.map((feature) => (
          <li key={feature.name} className="flex items-center gap-4">
            <div className="w-16 aspect-square grid place-items-center shrink-0">
              {feature.icon}
            </div>
            <div>
              <p className="font-bold text-sm mb-1 text-primary">
                {t(feature.name)}
              </p>
              <p className="text-muted text-xs">{t(feature.desc)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Features;

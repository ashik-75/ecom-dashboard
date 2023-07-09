interface HeaderProps {
  title: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <div className="space-y-2">
      <h1 className="font-bold text-xl">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Header;

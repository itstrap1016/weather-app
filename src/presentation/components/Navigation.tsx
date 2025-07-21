interface NavigationProps {
  city: string;
}

function Navigation({ city }: NavigationProps) {
  return (
    <nav className="h-14 flex justify-center items-center shadow-sm">
      <h1 className="font-medium">{city}</h1>
    </nav>
  );
}

export default Navigation;

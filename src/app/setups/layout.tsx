import CreateSetupButton from "@/components/setups/create-setup-button";

interface SetupsLayoutProps {
  children: React.ReactNode;
}

const SetupsLayout = ({ children }: SetupsLayoutProps) => {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div
        id="setup-header"
        className="flex flex-row w-full items-center justify-between"
      >
        <div>
          <h1 className="font-bold text-3xl">Setups</h1>
        </div>
        <div>
          <CreateSetupButton />
        </div>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
};
export default SetupsLayout;

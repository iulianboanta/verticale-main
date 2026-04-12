interface Props {
  visible?: boolean;
}

const AdBanner = ({ visible = true }: Props) => {
  if (!visible) return null;

  return (
    <section className="py-6">
      <div className="container flex justify-center">
        <div className="flex h-[90px] w-full max-w-[728px] items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 text-xs text-muted-foreground">
          Spațiu publicitar &bull; 728 × 90
        </div>
      </div>
    </section>
  );
};

export default AdBanner;

type Props = {
  images: string[];
};

// TODO: improve this component by adding hover card to each avatar

export default function UserAvatars({ images }: Props) {
  const length = images.length;

  return (
    <div className="relative flex items-center">
      {images.slice(0, 5).map((image, index) => (
        <img
          key={index}
          src={image}
          className="size-7 rounded-full border-2 border-dark-muted -ml-2 first:ml-0"
        />
      ))}
      {length > 5 && (
        <p className="text-sm ml-2 text-dark-subtle">+ {length - 5} more</p>
      )}
    </div>
  );
}

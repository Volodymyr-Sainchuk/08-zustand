"use client";

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <div>
      <p>Could not fetch the list of notes. {error.message}</p>;<button onClick={reset}>Reset</button>;
    </div>
  );
}

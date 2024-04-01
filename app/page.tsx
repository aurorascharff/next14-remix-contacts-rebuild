import Image from 'next/image';
import LogoFull from '../public/nextjs-13.svg';

export default function RootPage() {
  return (
    <div className="m-8 flex flex-col gap-2 text-center text-gray-text">
      <Image width={400} height={400} className="mb-2 block self-center" src={LogoFull} alt="logo" />
      <p>
        This is a rebuild of the{' '}
        <a className="hover:text-black" href="https://remix.run/docs/en/main/start/tutorial">
          Remix Contacts{' '}
        </a>
        tutorial app using Next.js 14 with Server Actions, Tailwind CSS and Prisma.
        <br />
        Check out{' '}
        <a className="hover:text-black" href="https://github.com/aurorascharff/next14-remix-contacts-rebuild">
          the code on GitHub
        </a>
        .
      </p>
    </div>
  );
}

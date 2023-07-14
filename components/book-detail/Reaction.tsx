import DislikeSvg from '../icon/DislikeSvg';
import LikeSvg from '../icon/LikeSvg';

export default function Reaction({
  selected
}: {
  selected: 'like' | 'dislike' | null;
}) {
  const likes = 24;
  const dislikes = 2;

  return (
    <div className='flex flex-nowrap items-center gap-4'>
      <button
        className={`
        p-1 px-2 rounded-full
        hover:bg-alt-secondary hover:bg-opacity-10
        ${
          selected === 'like'
            ? 'fill-alt-secondary '
            : 'fill-none stroke-alt-secondary'
        }

      `}
      >
        <div className='flex items-center gap-2 text-alt-secondary font-medium'>
          <LikeSvg className='h-6 w-6 mb-1' />
          <p>{likes}</p>
        </div>
      </button>

      <button
        className={`
        p-1 px-2 rounded-full
        hover:bg-alt-secondary hover:bg-opacity-10

        ${
          selected === 'dislike'
            ? 'fill-alt-secondary '
            : 'fill-none stroke-alt-secondary'
        }

      `}
      >
        <div className='flex items-center gap-2 text-alt-secondary font-medium'>
          <DislikeSvg className='h-6 w-6 mt-1' />
          <p>{dislikes}</p>
        </div>
      </button>
    </div>
  );
}

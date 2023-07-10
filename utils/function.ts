'use client';
import { User } from '@/types';
import { useRouter } from 'next/router';
import { RefObject, useEffect, useMemo, useState } from 'react';

export const formatEnumValue = (value: string) => {
  return value
    .split('-')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

export const handleFallBackProfileImage = (user: User) => {
  if (user.profileImg) return user.profileImg;

  const usernameWithNoSpace = user.username.trim().replace(' ', '+');

  return `https://ui-avatars.com/api/?name=${usernameWithNoSpace}&background=random&size=128`;
};

export function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: '100px',
        threshold: 1
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return isIntersecting;
}

// react debounce function
export function useDebounce(callback: Function, delay: number) {
  const debounceCallback = useMemo(() => {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
  }, [callback, delay]);
  return debounceCallback;
}

export function useUpdateDataInterval(callback: Function, minute: number) {
  useEffect(() => {
    const timer = setInterval(() => {
      callback();
    }, minute * 60 * 1000);
    return () => clearInterval(timer);
  }, [callback, minute]);
}

export function useLocale() {
  const { locale } = useRouter();

  const isKhmer = useMemo(() => {
    return locale === 'kh';
  }, [locale]);

  return { isKhmer };
}

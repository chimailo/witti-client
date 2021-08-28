/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';

type NextComposedProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> &
  NextLinkProps;

const NextComposed = React.forwardRef<HTMLAnchorElement, NextComposedProps>(
  (props, ref) => {
    const { as, href, replace, scroll, passHref, shallow, prefetch, ...other } =
      props;

    return (
      <NextLink
        href={href}
        prefetch={prefetch}
        as={as}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
      >
        <a ref={ref} {...other} />
      </NextLink>
    );
  }
);

NextComposed.displayName = 'NextComposed';

interface LinkPropsBase {
  activeClassName?: string;
  innerRef?: React.Ref<HTMLAnchorElement>;
  activeStyle?: { [key: string]: any };
  naked?: boolean;
}

export type LinkProps = LinkPropsBase &
  NextComposedProps &
  Omit<MuiLinkProps, 'href'>;

function Link(props: LinkProps) {
  const {
    href,
    activeStyle,
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });
  const last = router.pathname.split('/').length - 1;
  const isActive = pathname
    ?.split('/')
    .includes(router.pathname.split('/')[last]);

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={innerRef}
        href={href}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href as string}
      style={isActive || router.pathname === pathname ? activeStyle : undefined}
      {...other}
    />
  );
}

const LinkRef = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link {...props} innerRef={ref} />
));

LinkRef.displayName = 'LinkRef';
export default LinkRef;

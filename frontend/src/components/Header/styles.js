import styled from 'styled-components';
import { lighten } from 'polished';

import colors from '../../styles/colors';

export const Container = styled.header`
  width: 100%;
  height: 64px;
  background: ${colors.primary};
  border: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1024px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 20px;
    padding-right: 30px;
  }

  nav {
    flex: 1;

    svg {
      display: none;
      cursor: pointer;
    }

    ul {
      display: flex;
      align-items: center;
      padding: 0 30px;
    }
  }

  @media (max-width: 960px) {
    padding: 0;

    img {
      position: absolute;
      left: calc(50% - 103px);
    }

    nav {
      max-width: 26px;
      padding: 0 12px;

      svg {
        height: 64px;
        display: block;
      }

      ul {
        transform: translateX(-200px);
        transition: transform 0.3s;

        position: absolute;
        left: 0;
        top: 63px;
        z-index: 2;

        background: ${colors.primary};
        border: 1px solid rgba(0, 0, 0, 0.15);
        padding: 0;

        display: flex;
        flex-direction: column;
        align-items: flex-start;

        li {
          width: 100%;
          margin: 0;
          padding: 20px 30px;
          cursor: pointer;
          transition: background 0.3s;
        }
      }

      &:hover {
        max-width: 200px;

        ul {
          transform: translateX(0);

          li:hover {
            background: ${lighten(0.08, colors.primary)};
          }
        }
      }
    }
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 32px;
  background: rgba(255, 255, 255, 0.25);

  @media (max-width: 960px) {
    display: none;
  }
`;

export const ListItem = styled.li`
  margin-right: 15px;

  a {
    color: ${colors.whiteText};
    font-size: 15px;
    font-weight: bold;
    opacity: 0.7;
    transition: opacity 0.2s;

    &.active {
      opacity: 1;
    }
  }

  &:hover {
    a {
      opacity: 1;
    }
  }
`;

export const Profile = styled.div`
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  span {
    color: ${colors.whiteText};
    font-weight: bold;
  }

  button {
    background: transparent;
    border: 0;
    color: ${colors.whiteText};

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 960px) {
    padding: 0 12px;
  }
`;

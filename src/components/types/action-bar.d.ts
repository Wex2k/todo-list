/**
 * Props for the ActionBar component.
 *
 * @property loaded - Indicates whether the action bar has finished loading its state.
 */
export interface ActionBarProps {
  loaded: boolean;
}

export type ActionBarButton = {
  name: string;
  icon: React.ReactNode;
  title: string;
  action: () => void;
  show: boolean;
};

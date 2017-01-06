declare class Rx$BaseComponent<DefaultProps, Props, State> extends React$Component<DefaultProps, Props, State> {

  static defaultProps: $Abstract<DefaultProps>;
  props: Props;
  state: $Abstract<State>;

  //listenTo(listenable: Object | Function, callback: Function | string, defaultCallback?: Function | string): void;
  //listenToMany(listenables: Object): void;
}

declare module 'src/BaseComponent' {
    declare var exports: typeof Rx$BaseComponent;
}

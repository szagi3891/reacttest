//@flow
import * as React from 'react';
import logo from './logo.svg';
import './App.css';

import Rx from 'rxjs';

const thread$ = new Rx.BehaviorSubject(3);
const message$ = new Rx.BehaviorSubject(44);

/*
const subscribe = () => {
    return (target) => {
        const render = target.render.bind(target);

        target.shouldComponentUpdate = () => {
            return false;
        };

        const forceRerender = () => {
                                                //wymusza przerenderowanie
            target.forceUpdate();
        };

        target.render = () => {
            const subject = Rx.Subject();

            //zaczynamy renderować. utwórz strumień zbierający

            target.setStream(subject);           //wszystkie gettery podpinają się pod ten strumień

            const renderOut = render();

            subject.complete();     //po to aby żaden niesforny strumień nie zapisał nic ...

            subject.take(1).subscribe(forceRerender);

            return renderOut;
        };

        return target;
    };
};
*/

//console.log(this.render.toString());

type RenderType = () => React.Element<*>;

class ManagerSubscription {

    _currentRenderStreams: Rx.Subject<Observable<void>>;
    _sub: any;
    _forceUpdate: () => void;

    constructor(forceUpdate: () => void) {
        this._currentRenderStreams = new Rx.Subject();
        this._forceUpdate = forceUpdate;
        this._sub = this._currentRenderStreams.subscribe(() => {});
    }

    replaceRender(render: RenderType): RenderType {
        return () => {
            const newSubject = new Rx.Subject();

            console.info('przed renderem');
            const renderOut = render();
            console.info('za renderem');
            return renderOut;
        };
    }

}

class ViewBase<Props, State=void> extends React.Component {

    _manager: ManagerSubscription;

    constructor() {
        super();

        this._manager = new ManagerSubscription(() => {
            this.forceUpdate();
        });

        this.render = this._manager.replaceRender(this.render.bind(this));
    }

    getValue$<T>(stream: Rx.BehaviorSubject<T>): T {
        return true;
/*
        let isSet = false;
        let result = null;

        stream.take(1).subscribe(data => {
            isSet = true;
            result = data;
        });

        if (isSet !== true) {
            throw Error('panic');
        }

        //this._currentStream.next(Message.distincUntilChange().mapTo());

        return result;
*/
    }
}

type PropsType = {
    messageId: string,
};

class View extends ViewBase<PropsType> {                        //dziedziczenie dostarcza typy - dekorator funkcjonalność
    ddd = 121;

    render() {
        const { messageId } = this.props;
        const message = this.getValue$(message$);

        if (message) {
            return (
                <div>
                    model tenże { messageId } { this.ddd }
                </div>
            );
        }

        return (
            <div>
                brak - { messageId } { this.ddd }
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>

                <View messageId="dsadsadsa211" />
            </div>
        );
    }
}

export default App;

//const message$ = Storage.getMessage(this.props.messageId);
//const model = this.getValue(message$);                          //tutaj następuje bindowanie

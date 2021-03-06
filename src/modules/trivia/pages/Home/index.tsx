import React, {useEffect} from "react";
import { connect } from "react-redux";
import ListTrivia from "../../components/ListTrivia";
import { RootState } from "../../../../redux/store";

import "./styles.scss";
import { TriviaInfoItem } from "../../../../abstractions/api/models/triviaInfoItem";
import { onSetTriviaList } from "../../../../redux/modules/triviva/triviaList/fetch";

type StateProps = {
    triviaList: TriviaInfoItem[]
}

type DispatchProps = {
    setList: () => void
}

type Props = StateProps & DispatchProps

const HomePage = (props: Props) => {

    const {triviaList, setList} = props;

    useEffect(() => {
        setList();
    }, [triviaList]);

    return <div className="home-page">
        <div className="page-inner">
            <ListTrivia list={triviaList} />
        </div>
    </div>
}

const mapState = (state: RootState) => ({
    triviaList: state.triviaData.triviaItemsList
});

const mapProps = (dispatch: any) => ({
    setList: () => {
        dispatch(onSetTriviaList())
    }
})

export default connect(
    mapState,
    mapProps
)(HomePage);
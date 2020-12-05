import React, {useEffect} from "react";
import { connect } from "react-redux";
import TriviaInfoItem from "../../../../abstractions/api/models/triviaInfoItem";
import ListTrivia from "../../components/ListTrivia";
import { RootState } from "../../redux/store";
import { onSetTriviaList } from "../../redux/list/reducer";

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
        if (triviaList.length === 0) {
            setList();
        }
    })

    return <div className="home-page">
        <h1>Choose your trivia</h1>
        <ListTrivia list={triviaList} />
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
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";

const Wrapper = styled.div`
    height: 50vh;
    text-align: center;
`;

const SearchPresenter = ({ searchTerm, loading }) => (
    <Wrapper>
        {searchTerm === undefined && <FatText text={"조회 할 목록이 없습니다."} />}
    </Wrapper>
)

SearchPresenter.propTypes = {
    searchTerm: PropTypes.string,
    loading: PropTypes.bool
}

export default SearchPresenter;
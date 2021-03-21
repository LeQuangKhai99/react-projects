import Hobby from "./Hobby";
import PropTypes from 'prop-types';
import './HobbyList.css';

const HobbyList = ({hobbyList, handleHobbyClick, activeId}) => {
  return (
    <div>
        {hobbyList.map((hobby)=>{
          return <Hobby 
            key={hobby.id}
            hobby={hobby} 
            activeId = {activeId}
            onHobbyClick={handleHobbyClick} 
          />
        })}
    </div>
  );
}

HobbyList.propTypes = {
  hobbyList: PropTypes.array,
  activeId: PropTypes.number,
  onHobbyClick: PropTypes.func,
}

HobbyList.defaultProps = {
  hobbyList: [],
  activeId: null,
  onHobbyClick: null
}

export default HobbyList;
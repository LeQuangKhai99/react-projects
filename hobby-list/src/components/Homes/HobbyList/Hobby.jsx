const Hobby = ({hobby, activeId, onHobbyClick}) => {
  const handleClickHobby = (hobby) => {
    console.log(hobby);
      if (onHobbyClick){
        onHobbyClick(hobby);
      }
  }
  return (
    <li 
      className={hobby.id === activeId ? 'active' : ''}
      onClick={() => handleClickHobby(hobby)}>{hobby.title}</li>
  );
}

export default Hobby;
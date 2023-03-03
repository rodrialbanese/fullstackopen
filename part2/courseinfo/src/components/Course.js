const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  );
};

const Content = ({ course }) => {
  return (
    <ul>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </ul>
  );
};

const Total = ({ course }) => {
  const total = course.parts.reduce(
    (sum, actualValue) => sum + actualValue.exercises,
    0
  );
  return <p>Number of exercises {total}</p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;

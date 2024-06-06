import './index.css'

const ProjectShow = props => {
  const {details} = props
  const {name, imageurl} = details
  return (
    <li>
      <img src={imageurl} className="pic" alt={name} />
      <p className="name">{name}</p>
    </li>
  )
}
export default ProjectShow

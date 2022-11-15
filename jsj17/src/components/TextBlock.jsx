export default function TextBlock({ html }) {

  return (
    <div className="text-block">
      <div dangerouslySetInnerHTML={{__html: html}} />
    </div>
  )

}
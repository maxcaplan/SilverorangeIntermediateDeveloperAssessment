export function Card(props: any) {
  return (
    <div className="bg-white rounded-md border border-slate-300">
      {props.children}
    </div>
  );
}

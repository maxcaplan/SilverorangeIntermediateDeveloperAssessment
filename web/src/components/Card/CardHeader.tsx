export function CardHeader(props: any) {
  return (
    <div className={`border-b mx-3 py-3 border-slate-300 ${props.className}`}>
      {props.children}
    </div>
  );
}

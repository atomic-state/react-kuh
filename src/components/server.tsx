export function RenderList<T>({
  data,
  render,
}: {
  data: T[]
  render: (item: T, i: number, arr: T[]) => React.ReactNode
}) {
  return data.map(render)
}

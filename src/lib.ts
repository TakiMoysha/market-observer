export interface IRespondOpts {
  headers: { [key: string]: string };
}

export const Respond = (status: number, body: any, opts: IRespondOpts) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...opts.headers },
  });
};

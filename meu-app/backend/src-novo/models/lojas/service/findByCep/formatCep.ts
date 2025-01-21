export function formatCep(cep: string): string {
    return cep.replace(/-/g, '');
}

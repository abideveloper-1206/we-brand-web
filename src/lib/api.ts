const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'

export async function getGlobal(slug: string) {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/${slug}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) {
      return null
    }
    return await res.json()
  } catch (error) {
    console.error(`Error fetching global ${slug}:`, error)
    return null
  }
}

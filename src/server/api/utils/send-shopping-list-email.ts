import { env } from '@/env'
import { formatShoppingQuantity } from '@/lib/shopping-list'

interface ShoppingListEmailItem {
  name: string
  amount: string
  unit: string
  isChecked: boolean
  source?: string | null
  note?: string | null
}

interface ShoppingListEmailPayload {
  name: string
  updatedAt: Date
  items: ShoppingListEmailItem[]
}

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const formatTextList = (value?: string | null, separator = ', ') =>
  (value ?? '')
    .split('\n')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .join(separator)

const renderItemText = (shoppingList: ShoppingListEmailPayload) =>
  shoppingList.items
    .map((item) => {
      const source = formatTextList(item.source)
      const note = formatTextList(item.note)
      const meta = [source, note].filter(Boolean).join(' | ')

      return `${item.isChecked ? '[x]' : '[ ]'} ${formatShoppingQuantity(item.amount, item.unit)} ${item.name}${meta ? ` - ${meta}` : ''}`
    })
    .join('\n')

const renderItemRows = (
  shoppingList: ShoppingListEmailPayload,
  checked: boolean,
) =>
  shoppingList.items
    .filter((item) => item.isChecked === checked)
    .map((item) => {
      const source = formatTextList(item.source)
      const note = formatTextList(item.note, ' • ')

      return `
				<tr>
					<td style="padding:14px 16px;border-bottom:1px solid #e5e7eb;vertical-align:top;">
						<div style="font-size:16px;font-weight:600;color:#111827;">
							${escapeHtml(formatShoppingQuantity(item.amount, item.unit))} ${escapeHtml(item.name)}
						</div>
						${
              source
                ? `<div style="margin-top:4px;color:#6b7280;font-size:13px;">From ${escapeHtml(source)}</div>`
                : ''
            }
						${
              note
                ? `<div style="margin-top:4px;color:#6b7280;font-size:12px;">${escapeHtml(note)}</div>`
                : ''
            }
					</td>
				</tr>
			`
    })
    .join('')

const buildShoppingListEmailHtml = ({
  recipientName,
  shoppingList,
}: {
  recipientName?: string | null
  shoppingList: ShoppingListEmailPayload
}) => {
  const remainingItems = shoppingList.items.filter((item) => !item.isChecked)
  const checkedItems = shoppingList.items.filter((item) => item.isChecked)
  const headingName = recipientName?.trim() || 'there'
  const updatedAt = shoppingList.updatedAt.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return `
		<div style="margin:0;padding:32px 16px;background:#f3f4f6;font-family:Arial,sans-serif;color:#111827;">
			<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #e5e7eb;">
				<div style="padding:32px;background:linear-gradient(135deg,#111827 0%,#1f2937 100%);color:#ffffff;">
					<div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.72;">CE Nutrition</div>
					<h1 style="margin:12px 0 8px;font-size:30px;line-height:1.1;">${escapeHtml(shoppingList.name)}</h1>
					<p style="margin:0;font-size:15px;line-height:1.6;opacity:0.88;">
						Hi ${escapeHtml(headingName)}, here is your latest shopping list snapshot from ${escapeHtml(updatedAt)}.
					</p>
				</div>
				<div style="padding:24px;">
					<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px;">
						<div style="min-width:180px;padding:16px;border-radius:16px;background:#eff6ff;border:1px solid #bfdbfe;">
							<div style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#1d4ed8;">Need to buy</div>
							<div style="margin-top:8px;font-size:28px;font-weight:700;color:#111827;">${remainingItems.length}</div>
						</div>
						<div style="min-width:180px;padding:16px;border-radius:16px;background:#f9fafb;border:1px solid #e5e7eb;">
							<div style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;">Checked off</div>
							<div style="margin-top:8px;font-size:28px;font-weight:700;color:#111827;">${checkedItems.length}</div>
						</div>
					</div>
					<div style="margin-bottom:24px;">
						<h2 style="margin:0 0 12px;font-size:18px;color:#111827;">Still to buy</h2>
						<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:18px;overflow:hidden;">
							<tbody>
								${remainingItems.length > 0 ? renderItemRows(shoppingList, false) : '<tr><td style="padding:16px;color:#6b7280;">Everything on your list is checked off.</td></tr>'}
							</tbody>
						</table>
					</div>
					${
            checkedItems.length > 0
              ? `
									<div>
										<h2 style="margin:0 0 12px;font-size:18px;color:#111827;">Checked off</h2>
										<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:18px;overflow:hidden;">
											<tbody>
												${renderItemRows(shoppingList, true)}
											</tbody>
										</table>
									</div>
								`
              : ''
          }
				</div>
			</div>
		</div>
	`
}

const buildShoppingListEmailText = ({
  recipientName,
  shoppingList,
}: {
  recipientName?: string | null
  shoppingList: ShoppingListEmailPayload
}) => {
  const name = recipientName?.trim() || 'there'

  return [
    `Hi ${name},`,
    '',
    `Here is your current shopping list: ${shoppingList.name}.`,
    '',
    renderItemText(shoppingList),
  ].join('\n')
}

const sendShoppingListEmail = async ({
  recipientEmail,
  recipientName,
  shoppingList,
}: {
  recipientEmail: string
  recipientName?: string | null
  shoppingList: ShoppingListEmailPayload
}) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.EMAIL_SERVER_PASSWORD}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [recipientEmail],
      subject: shoppingList.name,
      html: buildShoppingListEmailHtml({
        recipientName,
        shoppingList,
      }),
      text: buildShoppingListEmailText({
        recipientName,
        shoppingList,
      }),
    }),
  })

  const payload = (await response.json()) as {
    error?: { message?: string }
    id?: string
  }

  if (!response.ok) {
    throw new Error(payload.error?.message ?? 'Failed to send shopping list')
  }

  return payload
}

export { sendShoppingListEmail }

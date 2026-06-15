import type { ExplainLang } from '@/utils/storage';
import { LESSON_TAB_LABELS } from '@/i18n/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const HEX_DIGITS = [
  ['0', '0000'], ['1', '0001'], ['2', '0010'], ['3', '0011'],
  ['4', '0100'], ['5', '0101'], ['6', '0110'], ['7', '0111'],
  ['8', '1000'], ['9', '1001'], ['A', '1010'], ['B', '1011'],
  ['C', '1100'], ['D', '1101'], ['E', '1110'], ['F', '1111'],
] as const;

export type LessonId = 'basics' | 'dec2bin' | 'bin2dec' | 'hex';

export const LESSON_TABS: { id: LessonId }[] = [
  { id: 'basics' },
  { id: 'dec2bin' },
  { id: 'bin2dec' },
  { id: 'hex' },
];

export function getLessonTabLabel(id: LessonId, lang: ExplainLang) {
  return LESSON_TAB_LABELS[lang][id];
}

function BasicsLesson({ lang }: { lang: ExplainLang }) {
  if (lang === 'en') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Why are conversions hard without a calculator?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
        <p>
          Because you need <strong>manual division and addition</strong> — but if you memorize a simple table, it becomes easy!
        </p>
        <Alert>
          <AlertDescription>
            <strong>Key tip:</strong> Memorize powers of 2 from 1 to 256 — this is the most important thing for the exam.
          </AlertDescription>
        </Alert>
        <div className="table-scroll">
        <table className="w-full min-w-[32rem] border-collapse text-sm [&_td]:border [&_td]:p-2 [&_th]:border [&_th]:bg-muted [&_th]:p-2">
          <thead>
            <tr>
              <th>Position (from right)</th>
              <th>7</th><th>6</th><th>5</th><th>4</th><th>3</th><th>2</th><th>1</th><th>0</th>
            </tr>
            <tr>
              <th>Value</th>
              <td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td>
            </tr>
            <tr>
              <th>2ⁿ</th>
              <td>2⁷</td><td>2⁶</td><td>2⁵</td><td>2⁴</td><td>2³</td><td>2²</td><td>2¹</td><td>2⁰</td>
            </tr>
          </thead>
        </table>
        </div>
        <p><strong>Numbers to memorize:</strong></p>
        <ul>
          <li>255 (decimal) = 11111111 (binary) = FF (hex)</li>
          <li>128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255</li>
          <li>Each binary digit = 0 or 1 only</li>
          <li>Each hex digit = 4 binary digits</li>
        </ul>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="lesson-card">
      <h3>ليش التحويلات صعبة بدون حاسبة؟</h3>
      <p>
        لأنك تحتاج <strong>تقسيم وتجمع يدوي</strong> — بس إذا حفظت جدول بسيط، الموضوع يصير سهل!
      </p>
      <div className="tip-box">
        <strong>السر:</strong> احفظ قوى الـ 2 من 1 إلى 256 — هذا أهم شي للاختبار.
      </div>
      <div className="table-scroll">
      <table className="powers-table">
        <thead>
          <tr>
            <th>الموقع (من اليمين)</th>
            <th>7</th><th>6</th><th>5</th><th>4</th><th>3</th><th>2</th><th>1</th><th>0</th>
          </tr>
          <tr>
            <th>القيمة</th>
            <td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td>
          </tr>
          <tr>
            <th>2ⁿ</th>
            <td>2⁷</td><td>2⁶</td><td>2⁵</td><td>2⁴</td><td>2³</td><td>2²</td><td>2¹</td><td>2⁰</td>
          </tr>
        </thead>
      </table>
      </div>
      <p><strong>أرقام لازم تحفظها:</strong></p>
      <ul>
        <li>255 (عشري) = 11111111 (ثنائي) = FF (سداسي عشري)</li>
        <li>128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255</li>
        <li>كل خانة ثنائية = 0 أو 1 فقط</li>
        <li>كل خانة سداسي عشري = 4 خانات ثنائية</li>
      </ul>
    </div>
  );
}

function Dec2BinLesson({ lang }: { lang: ExplainLang }) {
  if (lang === 'en') {
    return (
      <div className="lesson-card">
        <h3>Decimal → Binary (divide by 2 method)</h3>
        <p><strong>Steps:</strong></p>
        <ol>
          <li>Divide the number by 2</li>
          <li>Write the <strong>remainder</strong> (0 or 1)</li>
          <li>Take the <strong>quotient</strong> and repeat until it reaches 0</li>
          <li>Read remainders <strong>from bottom to top</strong></li>
        </ol>
        <p><strong>Example: convert 60 to binary</strong></p>
        <div className="example-box">
          <span className="step-num">60</span> ÷ 2 = 30  remainder <span className="step-highlight">0</span><br />
          <span className="step-num">30</span> ÷ 2 = 15  remainder <span className="step-highlight">0</span><br />
          <span className="step-num">15</span> ÷ 2 = 7   remainder <span className="step-highlight">1</span><br />
          <span className="step-num">7</span>  ÷ 2 = 3   remainder <span className="step-highlight">1</span><br />
          <span className="step-num">3</span>  ÷ 2 = 1   remainder <span className="step-highlight">1</span><br />
          <span className="step-num">1</span>  ÷ 2 = 0   remainder <span className="step-highlight">1</span><br />
          ─────────────────────────<br />
          Result (bottom to top): <span className="step-highlight">111100</span>
        </div>
        <div className="tip-box">
          <strong>Faster method:</strong> Subtract the largest power of 2. E.g. 35 = 32 + 2 + 1 → <strong>100011</strong>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-card">
      <h3>عشري → ثنائي (طريقة القسمة على 2)</h3>
      <p><strong>الخطوات:</strong></p>
      <ol>
        <li>اقسم الرقم على 2</li>
        <li>اكتب <strong>الباقي</strong> (0 أو 1)</li>
        <li>خذ <strong>ناتج القسمة</strong> وكرر لين يصير 0</li>
        <li>اقرأ الباقيات <strong>من تحت لفوق</strong></li>
      </ol>
      <p><strong>مثال: حوّل 60 إلى ثنائي</strong></p>
      <div className="example-box">
        <span className="step-num">60</span> ÷ 2 = 30  باقي <span className="step-highlight">0</span><br />
        <span className="step-num">30</span> ÷ 2 = 15  باقي <span className="step-highlight">0</span><br />
        <span className="step-num">15</span> ÷ 2 = 7   باقي <span className="step-highlight">1</span><br />
        <span className="step-num">7</span>  ÷ 2 = 3   باقي <span className="step-highlight">1</span><br />
        <span className="step-num">3</span>  ÷ 2 = 1   باقي <span className="step-highlight">1</span><br />
        <span className="step-num">1</span>  ÷ 2 = 0   باقي <span className="step-highlight">1</span><br />
        ─────────────────────────<br />
        النتيجة (من تحت لفوق): <span className="step-highlight">111100</span>
      </div>
      <div className="tip-box">
        <strong>طريقة بديلة (أسرع):</strong> اطرح أكبر قوة 2 تناسب الرقم. مثلاً 35 = 32 + 2 + 1 → <strong>100011</strong>
      </div>
    </div>
  );
}

function Bin2DecLesson({ lang }: { lang: ExplainLang }) {
  if (lang === 'en') {
    return (
      <div className="lesson-card">
        <h3>Binary → Decimal (addition method)</h3>
        <p><strong>Steps:</strong></p>
        <ol>
          <li>Count positions from the <strong>right</strong> (starting at 0)</li>
          <li>Each 1 → add its position value</li>
          <li>Each 0 → ignore it</li>
        </ol>
        <p><strong>Example: convert 11100 to decimal</strong></p>
        <div className="example-box">
          &nbsp;&nbsp;1 &nbsp;&nbsp;1 &nbsp;&nbsp;1 &nbsp;&nbsp;0 &nbsp;&nbsp;0<br />
          ×16 ×8  ×4  ×2  ×1<br />
          ─────────────────────<br />
          16 + 8 + 4 + 0 + 0 = <span className="step-highlight">28</span>
        </div>
        <div className="tip-box">
          <strong>Shortcut:</strong> Leading zeros on the left do not change the value — focus on positions with 1.
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-card">
      <h3>ثنائي → عشري (طريقة الجمع)</h3>
      <p><strong>الخطوات:</strong></p>
      <ol>
        <li>عدّ المواقع من <strong>اليمين</strong> (يبدأ من 0)</li>
        <li>كل خانة = 1 → اجمع قيمة موقعها</li>
        <li>كل خانة = 0 → تجاهلها</li>
      </ol>
      <p><strong>مثال: حوّل 11100 إلى عشري</strong></p>
      <div className="example-box">
        &nbsp;&nbsp;1 &nbsp;&nbsp;1 &nbsp;&nbsp;1 &nbsp;&nbsp;0 &nbsp;&nbsp;0<br />
        ×16 ×8  ×4  ×2  ×1<br />
        ─────────────────────<br />
        16 + 8 + 4 + 0 + 0 = <span className="step-highlight">28</span>
      </div>
      <div className="tip-box">
        <strong>اختصار:</strong> الأصفار على اليسار ما تغيّر القيمة — ركّز على الخانات اللي فيها 1.
      </div>
    </div>
  );
}

function HexLesson({ lang }: { lang: ExplainLang }) {
  if (lang === 'en') {
    return (
      <div className="lesson-card">
        <h3>Hexadecimal ↔ Binary</h3>
        <p><strong>Golden rule:</strong> Each hex digit = 4 binary digits</p>
        <div className="hex-grid">
          {HEX_DIGITS.map(([digit, bits]) => (
            <div key={digit} className="hex-cell">
              <strong>{digit}</strong>
              {bits}
            </div>
          ))}
        </div>
        <p><strong>Hex → Binary: example 4B</strong></p>
        <div className="example-box">
          4 = <span className="step-highlight">0100</span><br />
          B = <span className="step-highlight">1011</span><br />
          Result: <span className="step-highlight">01001011</span>
        </div>
        <div className="tip-box">255 (decimal) = FF (hex) — memorize it! F = 1111 and FF = 11111111 = 255</div>
      </div>
    );
  }

  return (
    <div className="lesson-card">
      <h3>السداسي العشري (Hex) ↔ ثنائي</h3>
      <p><strong>القاعدة الذهبية:</strong> كل خانة Hex = 4 خانات Binary</p>
      <div className="hex-grid">
        {HEX_DIGITS.map(([digit, bits]) => (
          <div key={digit} className="hex-cell">
            <strong>{digit}</strong>
            {bits}
          </div>
        ))}
      </div>
      <p><strong>Hex → Binary: مثال 4B</strong></p>
      <div className="example-box">
        4 = <span className="step-highlight">0100</span><br />
        B = <span className="step-highlight">1011</span><br />
        النتيجة: <span className="step-highlight">01001011</span>
      </div>
      <div className="tip-box">255 (عشري) = FF (hex) — احفظها! لأن F = 1111 و FF = 11111111 = 255</div>
    </div>
  );
}

export function LessonContent({ id, lang }: { id: LessonId; lang: ExplainLang }) {
  switch (id) {
    case 'basics': return <BasicsLesson lang={lang} />;
    case 'dec2bin': return <Dec2BinLesson lang={lang} />;
    case 'bin2dec': return <Bin2DecLesson lang={lang} />;
    case 'hex': return <HexLesson lang={lang} />;
  }
}

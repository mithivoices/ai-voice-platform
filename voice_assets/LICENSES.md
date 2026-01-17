# Mithivoices v1 — Voice Asset Licenses

This document tracks the licensing information for all voice models included in the Mithivoices voice asset pack.

---

## License Summary

| License Type | Commercial Use | Cloud Deployment | Redistribution        | Attribution Required    |
| ------------ | -------------- | ---------------- | --------------------- | ----------------------- |
| **MIT**      | ✅ Yes         | ✅ Yes           | ✅ Yes (with license) | ✅ Yes (include notice) |

---

## Source Repository

**Piper TTS**

- Repository: https://github.com/rhasspy/piper
- Voice Models: https://huggingface.co/rhasspy/piper-voices
- License: MIT License
- Copyright: (c) 2022 Michael Hansen

---

## MIT License (Full Text)

```
MIT License

Copyright (c) 2022 Michael Hansen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Voice Model Attribution

### English (US) Voices

| Model File                 | Voice Name      | License | Source               |
| -------------------------- | --------------- | ------- | -------------------- |
| `en_US-lessac-medium.onnx` | Lessac (Medium) | MIT     | rhasspy/piper-voices |
| `en_US-lessac-high.onnx`   | Lessac (High)   | MIT     | rhasspy/piper-voices |
| `en_US-amy-medium.onnx`    | Amy             | MIT     | rhasspy/piper-voices |
| `en_US-ryan-medium.onnx`   | Ryan            | MIT     | rhasspy/piper-voices |
| `en_US-joe-medium.onnx`    | Joe             | MIT     | rhasspy/piper-voices |

### English (UK) Voices

| Model File                      | Voice Name  | License | Source               |
| ------------------------------- | ----------- | ------- | -------------------- |
| `en_GB-alan-medium.onnx`        | Alan        | MIT     | rhasspy/piper-voices |
| `en_GB-alba-medium.onnx`        | Alba        | MIT     | rhasspy/piper-voices |
| `en_GB-cori-high.onnx`          | Cori (High) | MIT     | rhasspy/piper-voices |
| `en_GB-jenny_dioco-medium.onnx` | Jenny Dioco | MIT     | rhasspy/piper-voices |

### German (DE) Voices

| Model File                   | Voice Name      | License | Source               |
| ---------------------------- | --------------- | ------- | -------------------- |
| `de_DE-thorsten-medium.onnx` | Thorsten        | MIT     | rhasspy/piper-voices |
| `de_DE-thorsten-high.onnx`   | Thorsten (High) | MIT     | rhasspy/piper-voices |

### Spanish Voices

| Model File                 | Voice Name       | License | Source               |
| -------------------------- | ---------------- | ------- | -------------------- |
| `es_ES-davefx-medium.onnx` | Davefx           | MIT     | rhasspy/piper-voices |
| `es_MX-claude-high.onnx`   | Claude (Mexican) | MIT     | rhasspy/piper-voices |

---

## Production Deployment Notes

1. **No model binaries are redistributed** in source code repositories
2. **Models are downloaded** from official HuggingFace repository
3. **Generated audio** from these models can be used commercially
4. **Attribution** should be maintained in internal documentation

---

## Legal Compliance Checklist

- [x] License reviewed and verified
- [x] Commercial use explicitly allowed
- [x] Cloud deployment explicitly allowed
- [x] No celebrity or real-person voices included
- [x] No research-only licenses
- [x] Attribution documented
- [x] All voices confirmed as synthetic

---

**Last Updated:** 2026-01-16
**Pack Version:** Mithivoices v1.0.0

import styles from './WelcomeIntro.module.css';

// Separate joints let the horse gallop while the complete silhouette crosses the screen.
export default function ArabianRider() {
  return (
    <div className={styles.ridingScene} aria-hidden="true">
      <div className={styles.desertGlow} />
      <div className={styles.horizon} />
      <div className={styles.riderTrack}>
        <div className={styles.dust}><i /><i /><i /><i /><i /></div>
        <svg className={styles.rider} viewBox="0 0 640 520" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="horse-coat" x1="350" y1="220" x2="300" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#303137" /><stop offset=".42" stopColor="#101115" /><stop offset="1" stopColor="#030406" />
            </linearGradient>
            <linearGradient id="rider-cloth" x1="250" y1="110" x2="380" y2="270" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff4d9" /><stop offset=".5" stopColor="#cfba91" /><stop offset="1" stopColor="#8d7752" />
            </linearGradient>
            <linearGradient id="sword-steel" x1="403" y1="23" x2="444" y2="144" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff" /><stop offset=".48" stopColor="#dee3e6" /><stop offset="1" stopColor="#8a9ba7" />
            </linearGradient>
          </defs>
          <ellipse className={styles.horseShadow} cx="322" cy="460" rx="188" ry="13" fill="#000" opacity=".22" />
          <g className={styles.gallop}>
            {/* The far legs are shaded behind the body. */}
            <g className={styles.rearFar} fill="#090a0d" stroke="#24252a" strokeWidth="1.5">
              <path d="M244 306 Q229 351 197 372 L153 393 118 438 103 444 106 454 128 453 170 412 222 392 Q263 365 277 326Z" />
            </g>
            <g className={styles.frontFar} fill="#090a0d" stroke="#24252a" strokeWidth="1.5">
              <path d="M377 297 Q393 333 416 359 L461 382 486 415 505 420 505 431 482 429 449 395 393 379 350 325Z" />
            </g>
            <path className={styles.tail} d="M227 280 Q189 243 162 267 Q135 288 109 275 Q139 306 164 287 Q144 315 111 316 Q148 332 173 310 Q155 343 116 348 Q174 361 193 314 Q205 290 233 307Z" fill="#08090c" stroke="#323137" strokeWidth="2" />
            {/* Compact back, arched neck, dished profile and high tail of an Arabian horse. */}
            <path d="M208 288 Q228 263 275 273 Q316 285 347 270 Q367 258 374 229 Q383 195 415 183 L439 177 442 150 452 169 466 153 463 181 Q474 188 476 202 L474 215 Q482 224 498 233 L496 249 Q481 258 466 248 L448 233 Q436 234 431 260 Q427 295 402 319 Q380 344 343 344 L282 337 Q255 351 225 333 Q206 319 208 288Z" fill="url(#horse-coat)" stroke="#49464a" strokeWidth="2" />
            <path d="M412 187 Q380 179 367 218 Q359 240 344 254 L367 250 357 267 Q385 253 391 222 Q398 204 414 195Z" fill="#050609" />
            <path d="M429 194 Q405 208 403 238 Q398 267 380 280" stroke="#646168" strokeWidth="3" opacity=".5" strokeLinecap="round" />
            <path d="M228 286 Q255 278 281 289 M294 320 Q333 331 358 316" stroke="#626068" strokeWidth="2" opacity=".3" strokeLinecap="round" />
            <g className={styles.rearNear} fill="url(#horse-coat)" stroke="#343238" strokeWidth="1.5">
              <path d="M237 309 Q238 344 264 366 L239 402 254 443 249 453 255 460 276 458 269 444 261 407 291 371 Q299 354 273 317Z" />
              <path d="M250 451 269 446 276 458 255 460Z" fill="#020305" />
            </g>
            <g className={styles.frontNear} fill="url(#horse-coat)" stroke="#343238" strokeWidth="1.5">
              <path d="M363 303 Q351 334 378 363 L405 390 393 434 381 444 383 455 405 450 427 390 Q430 381 418 369 L397 336 396 303Z" />
              <path d="M381 444 397 438 405 450 383 455Z" fill="#020305" />
            </g>
            {/* Leather tack and an embroidered saddle blanket. */}
            <path d="M268 274 331 278 346 326 Q307 344 271 324Z" fill="#623631" stroke="#c3a16b" strokeWidth="3" />
            <path d="M279 289 320 292 333 318 286 318Z" stroke="#b99863" strokeWidth="2" />
            <path d="m292 301 9-7 10 8-9 8Z" fill="#c3a16b" />
            <path d="M260 274 Q294 290 333 276" stroke="#231c1a" strokeWidth="10" strokeLinecap="round" />
            <path d="m449 190 16 55 M471 220l19 21 M452 215q-49 61-114 24" stroke="#bf9a61" strokeWidth="3" />
            <circle cx="466" cy="206" r="3" fill="#c9b08a" />
            <path d="m484 239 5 2" stroke="#030406" strokeWidth="4" strokeLinecap="round" />
            <g className={styles.horseman}>
              {/* Windblown cloak, robe, boots, and traditional head covering. */}
              <path className={styles.cloak} d="M304 153 Q273 151 250 177 Q220 199 179 190 Q204 217 234 217 L198 235 Q249 251 285 221 L311 207Z" fill="#a48b60" stroke="#d4be91" strokeWidth="2" />
              <path d="M296 158 Q317 143 339 161 L350 214 332 262 293 267 278 245 290 203Z" fill="url(#rider-cloth)" stroke="#edd8ae" strokeWidth="1.5" />
              <path d="M303 219 Q340 227 326 257 L312 293 311 324 293 328 289 312 292 277 301 250 278 246Z" fill="#d6c19a" />
              <path d="m294 309 18 1 2 21 13 8 Q330 346 318 347 L291 342Z" fill="#352820" stroke="#8e704c" strokeWidth="2" />
              <path d="m290 217 49 5-3 10-48-7Z" fill="#614632" />
              <path d="M337 170 360 187 393 145 404 152 373 208 Q369 215 360 211 L330 194Z" fill="url(#rider-cloth)" stroke="#ead4ab" strokeWidth="2" />
              <path d="m390 148 8-14 11-1 5 9-13 13Z" fill="#b88762" />
              <path d="M299 175 Q290 201 312 216 L341 236 348 226 319 199 320 183" fill="url(#rider-cloth)" stroke="#ac9167" strokeWidth="2" />
              <path d="m340 225 15 6-1 8-13-3Z" fill="#b88762" />
              <path d="M307 118 Q324 108 337 123 L340 143 330 159 309 151Z" fill="#b88762" />
              <path d="m332 132 12 8-8 4 M320 146l11 4" stroke="#52382d" strokeWidth="2" />
              <path d="M301 126 Q295 103 315 101 Q338 99 343 121 L322 120 314 144 324 178 298 163 291 139Z" fill="#f1e5cd" stroke="#c6b18c" strokeWidth="2" />
              <path d="M300 119 Q319 112 341 120" stroke="#211e1d" strokeWidth="7" />
              <path d="M300 132 306 157 316 167" stroke="#bda67e" strokeWidth="2" />
              {/* Raised curved blade stays fully inside the artwork. */}
              <path d="M401 132 Q403 81 448 25 Q428 82 413 136Z" fill="url(#sword-steel)" stroke="#fff3d4" strokeWidth="1.5" />
              <path d="m395 130 24 9 M402 138l-6 17" stroke="#d5b06a" strokeWidth="5" strokeLinecap="round" />
              <path className={styles.swordGlint} d="M437 42v20m-10-10h20" stroke="#fff9e7" strokeWidth="2" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
